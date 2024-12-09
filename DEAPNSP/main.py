from deap import base, creator, tools
import random
import numpy
import matplotlib.pyplot as plt
import seaborn as sns
from NurseSchedulingProblem import NurseSchedulingProblem
from eaSimpleWithElitism import eaSimpleWithElitism


def main(nurses):
    # Problem and Genetic Algorithm constants
    HARD_CONSTRAINT_PENALTY = 10000
    POPULATION_SIZE = 300
    P_CROSSOVER = 0.9
    P_MUTATION = 0.1
    MAX_GENERATIONS = 200
    HALL_OF_FAME_SIZE = 30
    RANDOM_SEED = 42

    # Set the random seed
    random.seed(RANDOM_SEED)

    # Create the toolbox
    toolbox = base.Toolbox()

    # Define the problem instance
    # nurses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    nsp = NurseSchedulingProblem(HARD_CONSTRAINT_PENALTY, nurses)

    # Define the fitness and individual
    creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
    creator.create("Individual", list, fitness=creator.FitnessMin)

    # Register operators in the toolbox
    toolbox.register("zeroOrOne", random.randint, 0, 1)
    toolbox.register("individualCreator", tools.initRepeat, creator.Individual, toolbox.zeroOrOne, len(nsp))
    toolbox.register("populationCreator", tools.initRepeat, list, toolbox.individualCreator)

    # Fitness calculation
    def getCost(individual):
        return nsp.getCost(individual),  # return a tuple

    toolbox.register("evaluate", getCost)

    # Genetic operators
    toolbox.register("select", tools.selTournament, tournsize=2)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", tools.mutFlipBit, indpb=1.0/len(nsp))

    # Create initial population
    population = toolbox.populationCreator(n=POPULATION_SIZE)

    # Prepare the statistics object
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("min", numpy.min)
    stats.register("avg", numpy.mean)

    # Define the hall-of-fame object
    hof = tools.HallOfFame(HALL_OF_FAME_SIZE)

    # Perform the Genetic Algorithm flow with hof feature added
    population, logbook = eaSimpleWithElitism(
        population, toolbox, cxpb=P_CROSSOVER, mutpb=P_MUTATION,
        ngen=MAX_GENERATIONS, stats=stats, halloffame=hof, verbose=True
    )

    # Print best solution found
    best = hof.items[0]
    print("-- Best Individual = ", best)
    print("-- Best Fitness = ", best.fitness.values[0])
    print("-- Schedule = ")
    # nsp.printScheduleInfo(best)
    return nsp.printScheduleInfo(best)



if __name__ == "__main__":
    main()
