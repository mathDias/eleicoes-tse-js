
# Eleições - Library JS TSE - Resultados Unificados 

Biblioteca que tem como função consumir em nível de cliente os arquivos JSON EA20 – Arquivo de resultado unificado, organizando os dados dos candidatos, ordenando em ordem crescente.

Utilização única requisição para cargo e múnicipio:
```
<script>
      window._tseAPI = window._tseAPI || {cmd: []};
      window._tseAPI.cmd.push(() => { window._tseAPI.init({ 
        ambiente : "simulado",
        ciclo : "ele2024",
        codigo : "10143",
        codigoCargo : "0013",
        codigoMunicipio : "71072",
        uf : "sp",
      }, callback())})
        
</script>
```

Utilização para multiplos cargos ou municípios:
```
<script>
      const spApi = window._tseAPI.getObject();
      spApi.init({ 
        ambiente : "simulado",
        ciclo : "ele2024",
        codigo : "10143",
        codigoCargo : "0013",
        codigoMunicipio : "71072",
        uf : "sp",
      },callback())

      const goApi = window._tseAPI.getObject();
      goApi.init({ 
        ambiente : "simulado",
        ciclo : "ele2024",
        codigo : "10143",
        codigoCargo : "0013",
        codigoMunicipio : "71072",
        uf : "sp",
      },callback())
</script>
```