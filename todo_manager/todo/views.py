from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo


def Index(request):
    return render(request, 'todo/index.html')


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
