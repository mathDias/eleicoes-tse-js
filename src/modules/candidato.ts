type CandidatoProps = {
    nome: string
    sigla: string
    imagem: string
    votos: number
    porcentagemVotos: string
    status: string
    eleito: 's' | 'n'
}
export default class Candidato {
    nome: string = ""
    sigla: string = ""
    imagem: string = ""
    votos: number = 0
    porcentagemVotos: string = '0,00'
    status = ''
    eleito = 'n'

    constructor(props : CandidatoProps) {
        this.nome = props.nome
        this.sigla = props.sigla
        this.imagem = props.imagem
        this.votos = props.votos
        this.porcentagemVotos = props.porcentagemVotos
        this.status = props.status
        this.eleito = props.eleito
    }
}