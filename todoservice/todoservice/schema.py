import graphene
from graphene import Schema, String


class Query(graphene.ObjectType):
    hello = String(default_value='Hi!')


schema = Schema(query=Query)
