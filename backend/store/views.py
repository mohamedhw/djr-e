from .models import Item, Order, OrderItem
from django.contrib import messages
from django.shortcuts import get_object_or_404
from .serializers import ItemSerializers, OrderSerializers, OrderItemSerializers, TaskSerializer
from rest_framework import generics, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, authentication
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


class Home(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializers
    permission_classes = (permissions.AllowAny, )

class Detail(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializers
    lookup_field = 'pk'


# @method_decorator(ensure_csrf_cookie, name='dispatch')
@api_view(["GET"])
def cart_view(request, *args, **kwargs):
    try:
        order_l = []
        order = Order.objects.get(user=request.user, ordered = False)
        for i in order.items.all():
            order_ = TaskSerializer(order, many=True).data
            print(order_)
            order_l.append(order_)
        return Response({"serialized": order_})
    except:
        return Response({"error": "error"})


@api_view(["POST", "GET"])
def add_to_cart(request, pk):
    item = get_object_or_404(Item, id=pk)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False,
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "Item quantity updated successfully!")
        else:
            order.items.add(order_item)
            messages.info(request, "Item added to your cart successfully!")
    else:
        order = Order.objects.create(user=request.user)
        order.items.add(order_item)
        messages.info(request, "Item added to your cart successfully!")
    return Response("store:order")


@api_view(["POST", "GET"])
def remove_from_cart(request, pk):
    item = get_object_or_404(Item, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False,
            )[0]
            order.items.remove(order_item)
            order_item.delete()
            messages.info(request, "this item was removed form the cart!")
        else:
            messages.info(request, "no order item")
            return Response({"message": "qs not found"})
    else:
        messages.info(request, "no order item")
        return Response({"message": "qs not found"})
    return Response({"massege": "success"})

@api_view(["POST", "GET"])
def remove_one_item_from_cart(request, pk):
    item = get_object_or_404(Item, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False,
            )[0]

            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()

            else:
                order.items.remove(order_item)
                order_item.delete()
                order.save()
        else:
            return Response({"message": "failed order not found"})
    else:
        return Response({"message": "qs not found"})
            
    messages.info(request, "Item quantity updated successfully !")
    return Response({"massege": "success"})


class PostSearch(generics.ListAPIView):
    queryset =Item.objects.all()
    serializer_class= ItemSerializers

    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        query = self.request.GET.get('q')
        qs = Item.objects.search(query)
        # qs = ItemSerializer(qs)

        return qs