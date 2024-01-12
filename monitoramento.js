"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importando módulos
var express = require("express");
// Definindo classe para dados ambientais
var DadosAmbientais = /** @class */ (function () {
    function DadosAmbientais(qualidadeAr, poluicao) {
        this.qualidadeAr = qualidadeAr;
        this.poluicao = poluicao;
    }
    return DadosAmbientais;
}());
// Definindo classe base para sensores
var Sensor = /** @class */ (function () {
    function Sensor() {
    }
    Sensor.prototype.lerDados = function () {
        // Lógica para ler dados do sensor (simulação)
        var qualidadeAr = Math.random();
        var poluicao = Math.random();
        return new DadosAmbientais(qualidadeAr, poluicao);
    };
    return Sensor;
}());
// Definindo classe base para servidor e interface gráfica
var SistemaMonitoramento = /** @class */ (function () {
    function SistemaMonitoramento() {
        var _this = this;
        this.sensor = new Sensor();
        this.app = express();
        this.porta = 3000;
        // Configurar servidor
        this.app.use(express.static('public'));
        this.app.get('/dados', function (req, res) {
            var dados = _this.sensor.lerDados();
            res.json(dados);
        });
        this.app.listen(this.porta, function () {
            console.log("Servidor iniciado em http://localhost:".concat(_this.porta));
        });
    }
    return SistemaMonitoramento;
}());
// Exemplo de uso
var sistema = new SistemaMonitoramento();
