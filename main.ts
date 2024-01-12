// Importando módulos
import * as express from 'express';

// Definindo classe para dados ambientais
class DadosAmbientais {
  constructor(public qualidadeAr: number, public poluicao: number) {}
}

// Definindo classe base para sensores
class Sensor {
  coletarDados(): DadosAmbientais {
    // Lógica para coletar dados do sensor (simulação)
    const qualidadeAr = Math.random();
    const poluicao = Math.random();
    return new DadosAmbientais(qualidadeAr, poluicao);
  }

  verificarCondicoesPerigosas(dados: DadosAmbientais): boolean {
    // Lógica para verificar se as condições são perigosas ou anormais
    // Neste exemplo, consideraremos como perigosas se a qualidade do ar for inferior a 0.2 e a poluição superior a 0.8
    return dados.qualidadeAr < 0.2 || dados.poluicao > 0.8;
  }
}

// Definindo classe base para servidor e interface gráfica
class SistemaMonitoramento {
    private sensor: Sensor = new Sensor();
    private app: express.Application = express();
    private porta: number = 3000;

    constructor() {
        // Configurar servidor
        this.app.use(express.static('public'));

        this.app.get('/dados', (req: express.Request, res: express.Response) => {
            // Utilizando o método coletarDados do sensor
            const dados = this.sensor.coletarDados();

            // Verificando condições perigosas
            const condicoesPerigosas = this.sensor.verificarCondicoesPerigosas(dados);

            // Respondendo com os dados e alerta se necessário
            res.json({
              dados,
              alerta: condicoesPerigosas ? 'Condições perigosas detectadas!' : null
            });
        });

        this.app.listen(this.porta, () => {
            console.log(`Servidor iniciado em http://localhost:${this.porta}`);
        });
    }
}

// Exemplo de uso
const sistema = new SistemaMonitoramento();
