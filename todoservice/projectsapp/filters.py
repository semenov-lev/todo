from django_filters import rest_framework as filters


class ToDosFilter(filters.FilterSet):
    """
    Project name filter input format: any str
    Creating range filter input format: Y-m-d
    """
    project_name = filters.CharFilter(field_name="project__name", lookup_expr='contains')
    creating_range = filters.DateFromToRangeFilter(field_name="create_timestamp")
