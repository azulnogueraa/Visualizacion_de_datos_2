import pandas as pd

df = pd.read_csv('sistema-unico-de-atencion-ciudadana-2021.csv', index_col=0, sep=";", low_memory=False)

df['fecha_ingreso'] = pd.to_datetime(df['fecha_ingreso'])  

mask = (df['fecha_ingreso'] > '1/12/2021') & (df['fecha_ingreso'] <= '31/12/2021')
df_filtrado= df.loc[mask]
df_filtrado.to_csv('filtrado.csv', index=False)
