from datasets import load_dataset
import json
import pandas as pd
import pickle
dataset = load_dataset("corbt/all-recipes")

print(dataset["train"])

df = dataset["train"].to_pandas()
# # create a file callled this or something else
df.to_pickle("DBCopy.pkl")

# After downloading only below lines are required
df = pd.read_pickle("DBCopy.pkl")

print(type(df))
print(df.head())
print(df.columns.values)
