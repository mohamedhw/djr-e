from dataclasses import fields
from rest_framework import serializers
from .models import Item, OrderItem, Order





class ItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = Item

        fields = "__all__"


class OrderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['get_item_final_price']

class Task_extendedSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['quantity', 'get_total_discount_price', 'get_total_price']

class TaskSerializer(serializers.ModelSerializer):
    task_extendeds = Task_extendedSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ['get_total']



class OrderSerializers(serializers.ModelSerializer):
    class Meta:
        model = Order

        fields = "__all__"