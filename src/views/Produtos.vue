<template>
    <div id="section-produtos">
        <div class="card-carro" v-for="(carro, i) of carros" :key="carro.id">
            <div class="div-img-carro">
                <img class="img-carro" :src="carro.imageUrl" :alt="carro.make + ' - ' + carro.version" loading="lazy" />
                <div class="btn-ver-detalhes-carro" @click="showSelectedCar(carro.make + carro.version, null)"><span>ver detalhes</span></div>
            </div>
            <div class="info-carro">
                <div class="num-info">
                    <b-col sm="12" md="6" class="tempo-restante">
                        <p>TEMPO RESTANTE</p>
                        <span><vue-countdown :seconds="carro.remainingTime"></vue-countdown></span>
                    </b-col>
                    <b-col sm="12" md="6" class="ultima-oferta">
                        <p>ULTIMA OFERTA</p>
                        <span>{{ 'R$ ' + formatMoney(getLastBid(carro.bids)) }}</span>
                    </b-col>
                </div>
                <div class="nome-info">
                    <h2>{{ carro.make + carro.version }}</h2>
                </div>
                <div class="meta-info">
                    <b-col sm="12" md="6" class="ano-carro">
                        <span>{{ carro.year }}</span>
                    </b-col>
                    <b-col sm="12" md="6" class="km-carro">
                        <span>{{ formatKM(carro.km) }} KM</span>
                    </b-col>
                </div>
                <div @click="showSelectedCar(carro.make + carro.version, i)" class="div-btn-oferta">
                    <p class="noselect btn-fazer-oferta">FAZER OFERTA</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCountdown from '@dmaksimovic/vue-countdown'

    export default {
        name: 'Produtos',
        components: {
            'vue-countdown': VueCountdown
        },
        data(){
            return {
                carros: []
            }
        },
        methods: {
            getLastBid(arr){
               return arr[arr.length - 1] != undefined ? arr[arr.length - 1].amount : 0
            },
            showSelectedCar(nome, i){
                if ( i == null) alert('Carro selecionado: ' + nome)
                else {
                    let lastbid = this.getLastBid(this.carros[i].bids)
                    this.carros[i].bids.push({
                        amount: lastbid + 250,
                        dealership: 'Alan Wesley', 
                        createdAt: new Date().toISOString(),
                        channel: 'Web',
                    }) 
                }
            },
            formatMoney(number, decPlaces, decSep, thouSep) {
                decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSep = typeof decSep === "undefined" ? "," : decSep;
                thouSep = typeof thouSep === "undefined" ? "." : thouSep;
                var sign = number < 0 ? "-" : "";
                var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
                var j = (j = i.length) > 3 ? j % 3 : 0;

                return sign +
                    (j ? i.substr(0, j) + thouSep : "") +
                    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
                    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
            },
            formatKM(km){
                let newkm = km.toString()
                
                if (km.length < 4) return km
                else {
                    return newkm.slice(0, newkm.length-3) + '.' + newkm.slice(newkm.length-3, newkm.length)
                }
            },
            convertLimitTime(futuro){
                let timestamp = futuro - ( Date.now() / 1000 )
                
                let date = new Date(timestamp + ( Date.now() / 1000 ))
                let hours = date.getHours()
                let minutes = "0" + date.getMinutes()
                let seconds = "0" + date.getSeconds()

                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                return formattedTime
            }
        },
        async created() {
            let carros = await fetch('https://s3-sa-east-1.amazonaws.com/config.instacarro.com/recruitment/auctions.json').then(response => response.json())
  .then(data => { return data })
            
            for (const carro of carros){
                this.carros.push(carro)
            }
        }
    }
</script>

<style scoped>
    #section-produtos {
        width: 95%;
        padding-top: 50px;
        padding-bottom: 50px;
        padding-left: 25px;
        padding-right: 25px;
        display: grid;
        grid-template-columns: 100%;
        grid-gap: 30px;
    }

    @media only screen and (min-width: 600px) and (max-width: 768px) {
        #section-produtos {
            padding-left: 50px;
            padding-right: 50px;
            grid-template-columns: repeat(2, 50%);
            grid-gap: 20px;
        }
    }

    @media only screen and (min-width: 769px) {
        #section-produtos {
            width: 95%;
            padding-top: 50px;
            padding-bottom: 50px;
            padding-left: 100px;
            padding-right: 100px;
            display: grid;
            grid-template-columns: repeat(4, 25%);
            grid-gap: 30px;
        }
    }

    .card-carro {
        width: 100%;
        height: 450px;
        background: #ffffff;
        border-radius: 5px;
    }

    .div-img-carro {
        z-index: 1;
    }

    .img-carro {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        width: 100%;
        height: 250px;
    }

    .btn-ver-detalhes-carro {
        width: 100%;
        height: 25px;
        border: none;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2;
        text-align: center;
        cursor: pointer;
        margin-top: -25px;
        opacity: 0.7;
    }

    .btn-ver-detalhes-carro > span {
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
    }

    .info-carro {
        padding-left: 7px;
        padding-right: 7px;
    }

    .num-info {
        width: 100%;
        height: 50px;
        display: flex;
        margin-top: 5px;
        align-items: center;
    }
    
    .tempo-restante, .ultima-oferta {
        font-size: 8px;
        text-align: center;
    }

    .tempo-restante {
        border-right: 2px solid rgb(211, 211, 211, 0.4);
    }

    .tempo-restante span {
        color: #ff6d4a;
        font-weight: bold;
        font-size: 18px;
    }

    .ultima-oferta span {
        color: #3eb871;
        font-weight: bold;
        font-size: 18px;
    }

    .nome-info {
        width: 100%;
        height: 60px;
        text-align: center;
        border-top: 2px solid rgb(211, 211, 211, 0.4);
        border-bottom: 2px solid rgb(211, 211, 211, 0.4);
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
    }

    .nome-info h2 {
        font-size: 16px;
        font-weight: bold;
    }

    .meta-info {
        width: 100%;
        height: 35px;
        display: flex;
        border-bottom: 2px solid rgb(211, 211, 211, 0.4);
        align-items: center;
    }

    .ano-carro {
        border-right: 2px solid rgb(211, 211, 211, 0.4);
    }

    .ano-carro, .km-carro {
        font-size: 12px;
        text-align: center;
    }

    .div-btn-oferta {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .btn-fazer-oferta {
        width: 100%;
        height: 30px;
        text-align: center;
        background-color: #3eb871; 
        color: #ffffff; 
        border-radius: 5px;
        border: none;
        padding-top: 3px;
        font-weight: bold;
    }

    .btn-fazer-oferta:hover {
        background-color: #ffffff; 
        color: #3eb871; 
        border: 1px solid #3eb871;
    }

    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
