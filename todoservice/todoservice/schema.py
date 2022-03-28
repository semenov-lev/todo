import graphene
from graphene_django import DjangoObjectType

from projectsapp.models import Project, ToDo
from usersapp.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType, name=graphene.String(required=False))
    all_todos = graphene.List(ToDoType, project_id=graphene.Int(required=False))
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = Project.objects.filter(name=name)
        return projects

    def resolve_all_todos(root, info, project_id=None):
        todos = ToDo.objects.all()
        if project_id:
            todos = ToDo.objects.filter(project_id=project_id)
        return todos

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(root, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, description, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.description = description
        project.save()
        return ProjectUpdateMutation(project=project)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name):
        new_project = Project(name=name)
        new_project.save()
        return ProjectCreateMutation(project=new_project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id):
        Project.objects.get(pk=id).delete()
        return ProjectDeleteMutation(project=None)


class Mutations(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
