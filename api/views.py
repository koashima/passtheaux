from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def main(req):
    return HttpResponse("<h1>PASS THE AUX</h1>")