// ============================================
// SPACE MISSION CONTROL - IIFE GLOBAL
// Aislamiento de scope (Fase 2)
// ============================================
(function () {
  "use strict";

  // ============================================
  // UTILIDADES
  // ============================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Reloj de la navbar
  const actualizarReloj = () => {
    const now = new Date();
    const hora = now.toLocaleTimeString("es-PE", { hour12: false });
    $("#navTime").textContent = hora;
  };
  setInterval(actualizarReloj, 1000);
  actualizarReloj();

  // Navegación por sidebar
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      $$(".nav-link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ============================================
  // FASE 1: IDENTIFICACIÓN DEL OPERADOR
  // ============================================
  const canvasF1 = $("#canvasFase1");
  const ctxF1 = canvasF1.getContext("2d");
  const nombreInput = $("#nombreInput");
  const misionInput = $("#misionInput");
  const velocidadRange = $("#velocidadRange");
  const velocidadValor = $("#velocidadValor");
  const btnPlay = $("#btnPlay");
  const btnPause = $("#btnPause");
  const btnReset = $("#btnReset");

  // Estado de la credencial
  let credencialActiva = false;
  let animacionCredencial = null;
  let anguloCredencial = 0;

  const dibujarCredencial = () => {
    const w = canvasF1.width;
    const h = canvasF1.height;

    // Fondo con gradiente animado
    const grad = ctxF1.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#0a0e1a");
    grad.addColorStop(0.5, "#111827");
    grad.addColorStop(1, "#0a0e1a");
    ctxF1.fillStyle = grad;
    ctxF1.fillRect(0, 0, w, h);

    // Grid de fondo
    ctxF1.strokeStyle = "rgba(0, 212, 255, 0.05)";
    ctxF1.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctxF1.beginPath();
      ctxF1.moveTo(x, 0);
      ctxF1.lineTo(x, h);
      ctxF1.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctxF1.beginPath();
      ctxF1.moveTo(0, y);
      ctxF1.lineTo(w, y);
      ctxF1.stroke();
    }

    // Marco de la credencial
    ctxF1.strokeStyle = credencialActiva ? "#00ff88" : "#00d4ff";
    ctxF1.lineWidth = 2;
    ctxF1.strokeRect(20, 20, w - 40, h - 40);

    // Título
    ctxF1.fillStyle = "#00d4ff";
    ctxF1.font = 'bold 14px "Courier New"';
    ctxF1.textAlign = "left";
    ctxF1.fillText("// CREDENCIAL DE OPERADOR", 40, 50);

    // Nombre
    ctxF1.fillStyle = "#ffffff";
    ctxF1.font = 'bold 42px "Courier New"';
    ctxF1.shadowColor = "#00d4ff";
    ctxF1.shadowBlur = 15;
    ctxF1.fillText((nombreInput.value || "OPERADOR").toUpperCase(), 40, 120);
    ctxF1.shadowBlur = 0;

    // Misión
    ctxF1.fillStyle = "#00ff88";
    ctxF1.font = 'bold 20px "Courier New"';
    ctxF1.fillText(
      "MISIÓN: " + (misionInput.value || "SIN ASIGNAR").toUpperCase(),
      40,
      160,
    );

    // Estado
    ctxF1.fillStyle = credencialActiva ? "#00ff88" : "#ffaa00";
    ctxF1.font = '14px "Courier New"';
    ctxF1.fillText(
      "ESTADO: " + (credencialActiva ? "● ACTIVO" : "○ EN ESPERA"),
      40,
      195,
    );

    // Velocidad
    ctxF1.fillStyle = "#8892a6";
    ctxF1.font = '12px "Courier New"';
    ctxF1.fillText("VELOCIDAD: " + velocidadRange.value + "x", 40, 215);

    // Indicador animado
    if (credencialActiva) {
      anguloCredencial += 0.05;
      const cx = w - 60;
      const cy = h - 60;
      const r = 25;
      ctxF1.beginPath();
      ctxF1.arc(cx, cy, r, 0, Math.PI * 2);
      ctxF1.strokeStyle = "rgba(0, 255, 136, 0.3)";
      ctxF1.lineWidth = 3;
      ctxF1.stroke();

      ctxF1.beginPath();
      ctxF1.arc(cx, cy, r, anguloCredencial, anguloCredencial + Math.PI * 1.5);
      ctxF1.strokeStyle = "#00ff88";
      ctxF1.lineWidth = 3;
      ctxF1.stroke();

      ctxF1.fillStyle = "#00ff88";
      ctxF1.font = 'bold 12px "Courier New"';
      ctxF1.textAlign = "center";
      ctxF1.fillText("ON", cx, cy + 4);
      ctxF1.textAlign = "left";
    }

    if (credencialActiva) {
      animacionCredencial = requestAnimationFrame(dibujarCredencial);
    }
  };

  // Eventos Fase 1
  nombreInput.addEventListener("input", () => {
    if (!credencialActiva) dibujarCredencial();
  });
  misionInput.addEventListener("input", () => {
    if (!credencialActiva) dibujarCredencial();
  });
  velocidadRange.addEventListener("input", (e) => {
    velocidadValor.textContent = e.target.value;
    if (!credencialActiva) dibujarCredencial();
  });

  btnPlay.addEventListener("click", () => {
    credencialActiva = true;
    btnPlay.classList.add("active");
    btnPause.classList.remove("active");
    if (animacionCredencial) cancelAnimationFrame(animacionCredencial);
    dibujarCredencial();
  });

  btnPause.addEventListener("click", () => {
    credencialActiva = false;
    if (animacionCredencial) {
      cancelAnimationFrame(animacionCredencial);
      animacionCredencial = null;
    }
    btnPause.classList.add("active");
    btnPlay.classList.remove("active");
    dibujarCredencial();
  });

  btnReset.addEventListener("click", () => {
    credencialActiva = false;
    if (animacionCredencial) {
      cancelAnimationFrame(animacionCredencial);
      animacionCredencial = null;
    }
    nombreInput.value = "";
    misionInput.value = "";
    velocidadRange.value = 5;
    velocidadValor.textContent = "5";
    btnPlay.classList.remove("active");
    btnPause.classList.remove("active");
    dibujarCredencial();
  });

  dibujarCredencial();

  // ============================================
  // FASE 2: TELEMETRÍA (IIFE + Closures)
  // ============================================
  // Closure para el estado de telemetría
  const crearTelemetria = () => {
    let frames = 0;
    let comandos = 0;
    let energia = 100;
    let temperatura = 22;
    let historial = [];

    return {
      procesarFrame: () => {
        frames++;
        // Simular consumo de energía
        if (frames % 10 === 0 && energia > 0) {
          energia = Math.max(0, energia - 0.5);
        }
        // Simular variación de temperatura
        temperatura = 22 + Math.sin(frames / 20) * 3;
        return { frames, comandos, energia, temperatura };
      },
      enviarComando: (nombre) => {
        comandos++;
        energia = Math.max(0, energia - 2);
        historial.push(
          `[${new Date().toLocaleTimeString()}] Comando: ${nombre}`,
        );
        if (historial.length > 10) historial.shift();
        return { frames, comandos, energia, temperatura, historial };
      },
      getEstado: () => ({ frames, comandos, energia, temperatura, historial }),
      reset: () => {
        frames = 0;
        comandos = 0;
        energia = 100;
        temperatura = 22;
        historial = [];
        return { frames, comandos, energia, temperatura, historial };
      },
    };
  };

  const telemetria = crearTelemetria();
  const telFrames = $("#telFrames");
  const telClicks = $("#telClicks");
  const telEnergia = $("#telEnergia");
  const telTemp = $("#telTemp");
  const logContainer = $("#logContainer");
  const btnComando = $("#btnComando");
  const btnResetTelemetria = $("#btnResetTelemetria");

  const actualizarTelemetriaUI = (estado) => {
    telFrames.textContent = estado.frames;
    telClicks.textContent = estado.comandos;
    telEnergia.textContent = estado.energia.toFixed(1) + "%";
    telTemp.textContent = estado.temperatura.toFixed(1) + "°C";
  };

  // Loop de telemetría con requestAnimationFrame
  let lastTelemetryTime = 0;
  const loopTelemetria = (timestamp) => {
    if (timestamp - lastTelemetryTime >= 100) {
      lastTelemetryTime = timestamp;
      const estado = telemetria.procesarFrame();
      actualizarTelemetriaUI(estado);
    }
    requestAnimationFrame(loopTelemetria);
  };
  requestAnimationFrame(loopTelemetria);

  btnComando.addEventListener("click", () => {
    const comandos = [
      "Ajustar rumbo",
      "Escanear sector",
      "Activar propulsores",
      "Calibrar sensores",
      "Transmitir datos",
    ];
    const cmd = comandos[Math.floor(Math.random() * comandos.length)];
    const estado = telemetria.enviarComando(cmd);
    actualizarTelemetriaUI(estado);

    // Actualizar log
    logContainer.innerHTML = estado.historial
      .map((h) => `<p class="log-entry">${h}</p>`)
      .join("");
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  btnResetTelemetria.addEventListener("click", () => {
    const estado = telemetria.reset();
    actualizarTelemetriaUI(estado);
    logContainer.innerHTML =
      '<p class="log-entry">[SISTEMA] Telemetría reiniciada...</p>';
  });

  // ============================================
  // FASE 3: CONTROL DE SISTEMAS (DOM)
  // ============================================
  const systemCards = $$(".system-card");
  const emailInput = $("#emailInput");
  const emailMensaje = $("#emailMensaje");
  const codigoInput = $("#codigoInput");
  const codigoMensaje = $("#codigoMensaje");
  const btnAcceder = $("#btnAcceder");

  // Toggle de sistemas con classList
  systemCards.forEach((card) => {
    const btn = card.querySelector("button");
    const status = card.querySelector(".system-status");
    btn.addEventListener("click", () => {
      card.classList.toggle("active");
      const activo = card.classList.contains("active");
      status.textContent = activo ? "● ACTIVO" : "○ EN ESPERA";
    });
  });

  // Validación de email
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  emailInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val === "") {
      emailMensaje.textContent = "";
      emailMensaje.className = "validation-msg";
    } else if (validarEmail(val)) {
      emailMensaje.textContent = "✅ Correo válido";
      emailMensaje.className = "validation-msg valid";
    } else {
      emailMensaje.textContent = "❌ Correo inválido";
      emailMensaje.className = "validation-msg invalid";
    }
    verificarAcceso();
  });

  // Validación de código
  codigoInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val === "") {
      codigoMensaje.textContent = "";
      codigoMensaje.className = "validation-msg";
    } else if (/^\d{6}$/.test(val)) {
      codigoMensaje.textContent = "✅ Código válido";
      codigoMensaje.className = "validation-msg valid";
    } else {
      codigoMensaje.textContent = "❌ Debe tener 6 dígitos";
      codigoMensaje.className = "validation-msg invalid";
    }
    verificarAcceso();
  });

  const verificarAcceso = () => {
    const emailOk = validarEmail(emailInput.value.trim());
    const codigoOk = /^\d{6}$/.test(codigoInput.value.trim());
    btnAcceder.disabled = !(emailOk && codigoOk);
  };

  btnAcceder.addEventListener("click", () => {
    const card = document.createElement("div");
    card.className = "log-entry";
    card.textContent = `[ACCESO] Operador autorizado: ${emailInput.value}`;
    alert("🔓 Acceso concedido al sistema");
  });

  // ============================================
  // FASE 4: RADAR DE ASTEROIDES (Canvas + RAF)
  // ============================================
  const canvasF4 = $("#canvasFase4");
  const ctxF4 = canvasF4.getContext("2d");
  const btnIniciarRadar = $("#btnIniciarRadar");
  const btnDetenerRadar = $("#btnDetenerRadar");
  const btnAddAsteroide = $("#btnAddAsteroide");
  const contadorAsteroides = $("#contadorAsteroides");

  let radarActivo = false;
  let radarAnimId = null;
  let ultimoTiempoRadar = 0;
  let asteroides = [];
  let anguloRadar = 0;

  const crearAsteroide = () => ({
    x: Math.random() * canvasF4.width,
    y: Math.random() * canvasF4.height,
    vx: (Math.random() - 0.5) * 150,
    vy: (Math.random() - 0.5) * 150,
    radio: Math.random() * 10 + 5,
    rotacion: 0,
    velRotacion: (Math.random() - 0.5) * 3,
    puntos: Array.from({ length: 7 }, () => Math.random() * 0.5 + 0.75),
  });

  for (let i = 0; i < 12; i++) asteroides.push(crearAsteroide());
  contadorAsteroides.textContent = asteroides.length;

  const dibujarRadar = () => {
    const w = canvasF4.width;
    const h = canvasF4.height;

    // Fondo
    ctxF4.fillStyle = "#050810";
    ctxF4.fillRect(0, 0, w, h);

    // Grid circular
    ctxF4.strokeStyle = "rgba(0, 212, 255, 0.1)";
    ctxF4.lineWidth = 1;
    const cx = w / 2,
      cy = h / 2;
    const maxR = Math.min(w, h) / 2 - 20;

    for (let r = 50; r < maxR; r += 50) {
      ctxF4.beginPath();
      ctxF4.arc(cx, cy, r, 0, Math.PI * 2);
      ctxF4.stroke();
    }

    // Líneas radiales
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      ctxF4.beginPath();
      ctxF4.moveTo(cx, cy);
      ctxF4.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctxF4.stroke();
    }

    // Barrido del radar
    anguloRadar += 0.02;
    const grad = ctxF4.createConicGradient(anguloRadar, cx, cy);
    grad.addColorStop(0, "rgba(0, 212, 255, 0.4)");
    grad.addColorStop(0.1, "rgba(0, 212, 255, 0)");
    grad.addColorStop(1, "rgba(0, 212, 255, 0)");
    ctxF4.fillStyle = grad;
    ctxF4.beginPath();
    ctxF4.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctxF4.fill();

    // Centro
    ctxF4.beginPath();
    ctxF4.arc(cx, cy, 5, 0, Math.PI * 2);
    ctxF4.fillStyle = "#00d4ff";
    ctxF4.shadowColor = "#00d4ff";
    ctxF4.shadowBlur = 15;
    ctxF4.fill();
    ctxF4.shadowBlur = 0;

    // Asteroides
    asteroides.forEach((a) => {
      ctxF4.save();
      ctxF4.translate(a.x, a.y);
      ctxF4.rotate(a.rotacion);

      ctxF4.beginPath();
      const n = a.puntos.length;
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        const r = a.radio * a.puntos[i];
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctxF4.moveTo(px, py);
        else ctxF4.lineTo(px, py);
      }
      ctxF4.closePath();
      ctxF4.fillStyle = "#8892a6";
      ctxF4.strokeStyle = "#ffaa00";
      ctxF4.lineWidth = 1;
      ctxF4.fill();
      ctxF4.stroke();

      ctxF4.restore();
    });
  };

  const animarRadar = (timestamp) => {
    if (!radarActivo) return;

    const dt = Math.min((timestamp - ultimoTiempoRadar) / 1000, 0.1);
    ultimoTiempoRadar = timestamp;

    asteroides.forEach((a) => {
      a.x += a.vx * dt;
      a.y += a.vy * dt;
      a.rotacion += a.velRotacion * dt;

      // Rebote
      if (a.x < a.radio || a.x > canvasF4.width - a.radio) {
        a.vx *= -1;
        a.x = Math.max(a.radio, Math.min(canvasF4.width - a.radio, a.x));
      }
      if (a.y < a.radio || a.y > canvasF4.height - a.radio) {
        a.vy *= -1;
        a.y = Math.max(a.radio, Math.min(canvasF4.height - a.radio, a.y));
      }
    });

    dibujarRadar();
    radarAnimId = requestAnimationFrame(animarRadar);
  };

  btnIniciarRadar.addEventListener("click", () => {
    if (!radarActivo) {
      radarActivo = true;
      ultimoTiempoRadar = performance.now();
      radarAnimId = requestAnimationFrame(animarRadar);
      btnIniciarRadar.classList.add("active");
    }
  });

  btnDetenerRadar.addEventListener("click", () => {
    radarActivo = false;
    if (radarAnimId) {
      cancelAnimationFrame(radarAnimId);
      radarAnimId = null;
    }
    btnIniciarRadar.classList.remove("active");
  });

  btnAddAsteroide.addEventListener("click", () => {
    asteroides.push(crearAsteroide());
    contadorAsteroides.textContent = asteroides.length;
    if (!radarActivo) dibujarRadar();
  });

  dibujarRadar();

  // ============================================
  // FASE 5: MONITOR DE RENDIMIENTO
  // ============================================
  const fpsActual = $("#fpsActual");
  const memoriaMB = $("#memoriaMB");
  const listenersActivos = $("#listenersActivos");
  const posiblesLeaks = $("#posiblesLeaks");
  const fpsChart = $("#fpsChart");
  const ctxFps = fpsChart.getContext("2d");
  const barraMemoria = $("#barraMemoria");
  const porcentajeMemoria = $("#porcentajeMemoria");
  const btnAnalizar = $("#btnAnalizar");
  const btnSimularLeak = $("#btnSimularLeak");
  const btnLimpiarMemoria = $("#btnLimpiarMemoria");
  const consoleLog = $("#consoleLog");
  const estadoSalud = $("#estadoSalud");

  let fpsHistory = [];
  let frameCount = 0;
  let lastFpsTime = performance.now();
  let currentFps = 0;
  let memoryLeak = [];

  const logConsole = (msg, tipo = "info") => {
    const p = document.createElement("p");
    p.textContent = "> " + msg;
    if (tipo === "warn") p.style.color = "#ffaa00";
    if (tipo === "error") p.style.color = "#ff4466";
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  };

  const medirFps = () => {
    frameCount++;
    const now = performance.now();

    if (now - lastFpsTime >= 1000) {
      currentFps = frameCount;
      frameCount = 0;
      lastFpsTime = now;

      fpsActual.textContent = currentFps;
      fpsHistory.push(currentFps);
      if (fpsHistory.length > 60) fpsHistory.shift();
      dibujarGraficoFps();

      // Estado de salud
      if (currentFps >= 50) {
        estadoSalud.textContent = "✅ SALUDABLE";
        estadoSalud.style.color = "#00ff88";
        estadoSalud.style.borderColor = "rgba(0,255,136,0.3)";
      } else if (currentFps >= 30) {
        estadoSalud.textContent = "⚠ MODERADO";
        estadoSalud.style.color = "#ffaa00";
        estadoSalud.style.borderColor = "rgba(255,170,0,0.3)";
      } else {
        estadoSalud.textContent = "🔴 CRÍTICO";
        estadoSalud.style.color = "#ff4466";
        estadoSalud.style.borderColor = "rgba(255,68,102,0.3)";
      }
    }

    requestAnimationFrame(medirFps);
  };
  requestAnimationFrame(medirFps);

  const dibujarGraficoFps = () => {
    const w = fpsChart.width;
    const h = fpsChart.height;
    ctxFps.clearRect(0, 0, w, h);
    ctxFps.fillStyle = "#050810";
    ctxFps.fillRect(0, 0, w, h);

    if (fpsHistory.length < 2) return;

    const maxFps = 160;
    const stepX = w / (fpsHistory.length - 1);

    // Línea 60 FPS
    ctxFps.beginPath();
    ctxFps.strokeStyle = "rgba(255, 170, 0, 0.4)";
    ctxFps.setLineDash([5, 5]);
    ctxFps.moveTo(0, h - (60 / maxFps) * h);
    ctxFps.lineTo(w, h - (60 / maxFps) * h);
    ctxFps.stroke();
    ctxFps.setLineDash([]);

    // Línea de FPS
    ctxFps.beginPath();
    ctxFps.strokeStyle = "#00d4ff";
    ctxFps.lineWidth = 2;
    fpsHistory.forEach((fps, i) => {
      const x = i * stepX;
      const y = h - (fps / maxFps) * h;
      if (i === 0) ctxFps.moveTo(x, y);
      else ctxFps.lineTo(x, y);
    });
    ctxFps.stroke();

    // Relleno
    ctxFps.lineTo(w, h);
    ctxFps.lineTo(0, h);
    ctxFps.closePath();
    ctxFps.fillStyle = "rgba(0, 212, 255, 0.1)";
    ctxFps.fill();
  };

  // Actualizar métricas
  setInterval(() => {
    if (performance.memory) {
      const mb = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
      const pct = (
        (performance.memory.usedJSHeapSize /
          performance.memory.jsHeapSizeLimit) *
        100
      ).toFixed(1);
      memoriaMB.textContent = mb;
      barraMemoria.style.width = pct + "%";
      porcentajeMemoria.textContent = pct + "%";
    } else {
      memoriaMB.textContent = "N/A";
    }

    const listenerCount = document.querySelectorAll("*").length;
    listenersActivos.textContent = listenerCount;
    posiblesLeaks.textContent = memoryLeak.length;
  }, 1000);

  btnAnalizar.addEventListener("click", () => {
    logConsole(
      `Análisis: FPS=${currentFps}, Memoria=${memoriaMB.textContent}MB, Leaks=${memoryLeak.length}`,
    );
    console.log("🔍 Análisis:", {
      fps: currentFps,
      memoria: memoriaMB.textContent,
      leaks: memoryLeak.length,
    });
  });

  btnSimularLeak.addEventListener("click", () => {
    for (let i = 0; i < 5000; i++) {
      memoryLeak.push({
        data: new Array(100).fill("leak"),
        timestamp: Date.now(),
      });
    }
    posiblesLeaks.textContent = memoryLeak.length;
    logConsole(`⚠ Memory leak simulado: ${memoryLeak.length} objetos`, "warn");
  });

  btnLimpiarMemoria.addEventListener("click", () => {
    memoryLeak = [];
    posiblesLeaks.textContent = 0;
    if (window.gc) window.gc();
    logConsole("🧹 Memoria limpiada correctamente");
  });

  // ============================================
  // LOG FINAL
  // ============================================
  console.log(
    "%c🛸 SPACE MISSION CONTROL",
    "color: #00d4ff; font-size: 24px; font-weight: bold;",
  );
  console.log("%cSistema iniciado correctamente", "color: #00ff88;");
  console.log(
    "Módulos: 01.Identificación | 02.Telemetría | 03.Sistemas | 04.Radar | 05.Monitor",
  );
})();
