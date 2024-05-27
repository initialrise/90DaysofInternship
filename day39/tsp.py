import random
import copy

graph_nodes = [
    ("A", [0, 10, 15, 20]),
    ("B", [10, 0, 35, 25]),
    ("C", [15, 35, 0, 30]),
    ("D", [20, 25, 30, 0])
]
visited = []

def tsp():
    city = graph_nodes[0]  # Start from the first city
    visited.append(city)

    total_distance = 0

    while len(visited) < len(graph_nodes):
        print(f"\n\n\nAppending {city[0]}")
        print(f"Finding nearest neighbour to {city[0]} having distances {city[1]}")
        
        weights = city[1]
        temp_weights = [w if i not in [graph_nodes.index(c) for c in visited] else float('inf') for i, w in enumerate(weights)]
        min_distance = min(temp_weights)
        nn = temp_weights.index(min_distance)

        total_distance += min_distance
        city = graph_nodes[nn]
        visited.append(city)
        print(f"The nearest unvisited neighbour to {city[0]} is {graph_nodes[nn][0]}")

    total_distance += graph_nodes[graph_nodes.index(visited[-1])][1][0]

    print(f"The visited order is {[x[0] for x in visited]}")
    print(f"The total distance of the path is {total_distance}")

tsp()

