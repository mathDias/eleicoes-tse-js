// import Candidato from "./candidato";

import Candidato from "./candidato";

type eleicaoProps = {
    ciclo: string;
    ambiente: 'simulado' | 'oficial';
    codigo: string;
};

type resultProps = {
    uf: string;
    codigoMunicipio : string;
    codigoCargo: string;
}

type cargosProps = {
    cd : string,
    nmn: string // nome do cargo Neutro
    nv: number // numero de vagas do cargo
    agr: {
        com : string // sigla
        par: {
            sg : string // sigla
            n: number // numero
            nm: string // nome do partido
            cand: {
                n: string // Número do candidato na urna
                sqcand: string // identificador sqcand
                nm: string // nome
                nmu: string // nome na urna
                e: 's' | 'n' // indica se está eleito ou n
                st: string // status eleito etc sse campo somente será preenchido quando houver totalização final.
                vap: string // quantidade de votos para o candidato
                pvap: string //Percentual de votos computados¹ atribuídos ao candidato em relação aos votos a votáveis concorrentes.
                pvapn: string // exemplo "0,049814847"
            }[]
        }[]
    }[]
}

type dadosProps = {
    ele : number; // codigo da eleicao
    t:  1 | 2; // turno da eleicao
    sup: 's' | 'n' // eleição suplementar ou não
    dg: string // data da geração do arquivo
    hg: string // hora da geração do arquivo
    dt: string // data da totalização
    ht: string // hora da totalização
    tf: 's' | 'n' // totalização final s ou n
    md: 's' | 'e' | 'n' // matematicamente definido s = segundo turno, e = eleito, n = definido
    carg: cargosProps[],
    s: {
        pstn : string // % de urnas apuradas
    }
    v:  {
        tv: number; // total de votos
        vb: number;
        vn: number;
        vnt: number;
        van: number;
        vansj: number;
        vv: number;
    }

}

export default class TseAPI {
    cmd: Commands = [];
    dataLoaded = false;
    data: dadosProps | null = null
    fotoUrl = ""
    candidatos = new Set<Candidato>()

    getObject(){
        return new TseAPI()
    }

    reset(){
        this.data = null
        this.dataLoaded = false
    }
    
    async init({ambiente,ciclo,codigo,codigoCargo,codigoMunicipio,uf}: eleicaoProps & resultProps, callback: any) {
        const baseUrl = ambiente === 'simulado' ? 'https://resultados-sim.tse.jus.br/simulado/' : "https://resultados.tse.jus.br/";
        const apiUrl = baseUrl+ ciclo+"/" + codigo+"/dados/"+uf+"/"+uf+codigoMunicipio+"-c"+codigoCargo+"-e0"+codigo+"-u.json";
        this.fotoUrl = baseUrl+ ciclo+"/" + codigo+"/fotos/"+uf+"/";
        // "https://resultados-sim.tse.jus.br/simulado/ele2024/10143/dados/sp/sp71072-c0013-e010143-u.json";
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error to get data from TSE');
            }
            return response.json();
        })
        .then(data => {
            this.dataLoaded = true
            this.data = data
            this.setCandidatos(callback)
            return "ok"
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    setCandidatos(callback : any) {
        // const cargo = this.data?.carg[0].nmn ?? ""
        this.data?.carg[0]?.agr.map(e => {
            return e.par
        }).map(partidoArray => {
          partidoArray.map(partido => {
                const sigla = partido.sg
                partido.cand.map(candidatoData => {
                    this.candidatos.add(new Candidato({
                        nome: candidatoData.nm,
                        eleito: candidatoData.e === 's' ? 's' : 'n',
                        porcentagemVotos : candidatoData.pvap+"%",
                        sigla: sigla,
                        status: candidatoData.st,
                        imagem: this.fotoUrl + candidatoData.sqcand+".jpeg",
                        votos: parseInt(candidatoData.vap+"")
                    }))
                })
            })
        })
        const sortedArray = Array.from(this.candidatos).sort((a, b) => b.votos - a.votos);
        this.candidatos = new Set(sortedArray);
        callback()
    }

    getCandidatos(){
        return this.candidatos
    }
}