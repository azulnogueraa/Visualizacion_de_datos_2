import pandas as pd


df = pd.read_csv('sistema-unico-de-atencion-ciudadana-2021.csv', index_col=0, sep=";", low_memory=False)

df_filtrado = df.loc[df['categoria'] == 'TRANSITO']
df_filtrado.to_csv('trafico_en_festividades.csv', index=False)

