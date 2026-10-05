import { useEffect, useState } from "react";

const A = "/assets";

type Page = "analyze" | "history" | "premium" | "payment" | "success" | "result" | "login";
type Verdict = "safe" | "suspicious" | "danger";

const history = [
  { url: "bbva-mx-seguro.com/verifica", verdict: "danger" as Verdict, time: "9:41 a. m." },
  { url: "bit.ly/3abcd", verdict: "suspicious" as Verdict, time: "9:35 a. m." },
  { url: "google.com", verdict: "safe" as Verdict, time: "9:22 a. m." },
  { url: "beca-gratis-2026.xyz", verdict: "danger" as Verdict, time: "8:56 a. m." },
  { url: "mercadolibre.com.mx", verdict: "safe" as Verdict, time: "8:40 a. m." },
];

const verdictCopy = {
  safe: {
    label: "SIN SEÑALES DE PELIGRO",
    summary: "No encontramos señales de estafa.",
    icon: "c6228.svg",
    reasons: ["No encontramos señales de estafa en este link."],
    reasonIcons: ["ac780.svg"],
  },
  suspicious: {
    label: "SOSPECHOSO",
    summary: "Mejor no lo abras si no conoces a quien te lo mandó.",
    icon: "310c9.svg",
    reasons: ["Es un link acortado: no se ve a dónde te lleva realmente.", "No usa HTTPS, así que la conexión no es segura."],
    reasonIcons: ["a372a.svg", "c3d61.svg"],
  },
  danger: {
    label: "PELIGROSO",
    summary: "No abras este link.",
    icon: "1316c.svg",
    reasons: ["Dice 'bbva' pero NO es el sitio oficial. Parece una imitación.", "Usa palabras de urgencia (verifica, bloqueo). Es típico de estafas.", "El dominio tiene muchos guiones, algo común en sitios falsos."],
    reasonIcons: ["b61f1.svg", "a9795.svg", "e1233.svg"],
  },
};

function Header({ back, title, onBack, onLogin, signedIn }: { back?: boolean; title?: string; onBack?: () => void; onLogin?: () => void; signedIn?: boolean }) {
  if (back) {
    return (
      <header className="back-header reveal">
        <button className="icon-button" onClick={onBack} aria-label="Volver">
          <img src={`${A}/eff1f.svg`} alt="" />
        </button>
        <strong>{title}</strong>
      </header>
    );
  }
  return (
    <header className="brand-header reveal">
      <img src={`${A}/f6860.svg`} className="logo" alt="" />
      <strong>SafeClick</strong>
      {onLogin ? (
        <button className="login-trigger" onClick={onLogin}>
          <img src={`${A}/bd7e2.svg`} className="trust" alt="" />
          {signedIn ? "Mi cuenta" : "Ingresar"}
        </button>
      ) : <img src={`${A}/bd7e2.svg`} className="trust standalone" alt="" />}
    </header>
  );
}

function BottomNav({ page, go }: { page: Page; go: (page: Page) => void }) {
  const items: { page: Page; label: string; icon: string }[] = [
    { page: "analyze", label: "Analizar", icon: page === "analyze" ? "63426.svg" : "47921.svg" },
    { page: "history", label: "Historial", icon: page === "history" ? "25d89.svg" : "8c209.svg" },
    { page: "premium", label: "Premium", icon: page === "premium" ? "e5ae1.svg" : "fa27c.svg" },
  ];
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button className={page === item.page ? "active" : ""} onClick={() => go(item.page)} key={item.page}>
          <span><img src={`${A}/${item.icon}`} alt="" /></span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function LinkArt() {
  return (
    <div className="link-art reveal delay-1" aria-hidden="true">
      <span className="dot dot-one" />
      <span className="halo" />
      <span className="link-card"><img src={`${A}/63c54.svg`} alt="" /></span>
      <span className="shield-badge"><img src={`${A}/a9a21.svg`} alt="" /></span>
      <span className="dot dot-two" />
    </div>
  );
}

function Analyze({ onResult, onLogin, signedIn }: { onResult: (url: string, verdict: Verdict) => void; onLogin: () => void; signedIn: boolean }) {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const analyze = () => {
    const nextUrl = url.trim() || "https://bbva-mx-seguro.com/verifica";
    setScanning(true);
    window.setTimeout(() => {
      const normalized = nextUrl.toLowerCase();
      const verdict = normalized.includes("google") || normalized.includes("mercadolibre") ? "safe" : normalized.includes("bit.ly") ? "suspicious" : "danger";
      onResult(nextUrl, verdict);
    }, 1450);
  };
  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text || "https://bbva-mx-seguro.com/verifica");
    } catch {
      setUrl("https://bbva-mx-seguro.com/verifica");
    }
  };
  return (
    <>
      <Header onLogin={onLogin} signedIn={signedIn} />
      <main className="analyze-page">
        <LinkArt />
        <section className="intro reveal delay-2">
          <h1>¿Te llegó un link raro?</h1>
          <p>Pégalo aquí y te decimos si es una estafa.</p>
        </section>
        <div className={`link-input reveal delay-3 ${scanning ? "is-scanning" : ""}`}>
          <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Pega el link aquí" aria-label="Link para analizar" />
          <button onClick={paste}><img src={`${A}/9c322.svg`} alt="" /> Pegar</button>
          {scanning && <span className="scan-line" />}
        </div>
        <button className="primary reveal delay-4" onClick={analyze} disabled={scanning}>
          <img src={`${A}/a1991.svg`} alt="" />
          {scanning ? "Analizando…" : "Analizar"}
        </button>
        <p className="allowance reveal delay-4">Te quedan 3 análisis gratis hoy</p>
        <p className="tip reveal delay-4"><img src={`${A}/edb22.svg`} alt="" /> Si algo te da mala espina, revísalo antes de abrirlo.</p>
      </main>
    </>
  );
}

function History({ open, onLogin, signedIn }: { open: (url: string, verdict: Verdict) => void; onLogin: () => void; signedIn: boolean }) {
  return (
    <>
      <Header onLogin={onLogin} signedIn={signedIn} />
      <main className="history-page">
        <div className="reveal">
          <h1>Tus análisis recientes</h1>
          <p>Consulta lo que revisaste, cuando quieras.</p>
        </div>
        <small className="day-label reveal delay-1">HOY</small>
        <div className="history-list">
          {history.map((item, index) => (
            <button className="history-card reveal" style={{ animationDelay: `${120 + index * 70}ms` }} onClick={() => open(item.url, item.verdict)} key={item.url}>
              <span className="history-link-icon"><img src={`${A}/1b793.svg`} alt="" /></span>
              <span className="history-info">
                <strong>{item.url}</strong>
                <span className="history-meta">
                  <span className={`pill ${item.verdict}`}><i />{item.verdict === "safe" ? "Sin señales" : item.verdict === "suspicious" ? "Sospechoso" : "Peligroso"}</span>
                  <time>{item.time}</time>
                </span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}

function Premium({ subscribe, onLogin, signedIn }: { subscribe: () => void; onLogin: () => void; signedIn: boolean }) {
  return (
    <>
      <Header onLogin={onLogin} signedIn={signedIn} />
      <main className="premium-page">
        <div className="premium-mark reveal"><img src={`${A}/f6860.svg`} alt="" /></div>
        <div className="premium-title reveal delay-1"><h1>SafeClick Premium</h1><p>Más tranquilidad, sin límites diarios.</p></div>
        <section className="plan reveal delay-2">
          <small>PLAN MENSUAL</small>
          <p className="price">$29 <span>MXN / mes</span></p>
          <ul>
            {["Análisis ilimitados", "Historial completo", "Explicaciones detalladas"].map((benefit) => <li key={benefit}><span>✓</span>{benefit}</li>)}
          </ul>
          <button className="primary" onClick={subscribe}>Suscribirme</button>
        </section>
        <div className="school reveal delay-3"><img src={`${A}/d8bbf.svg`} alt="" /><span>Plan para escuelas disponible: $500 MXN al mes</span></div>
      </main>
    </>
  );
}

function Payment({ back, paid }: { back: () => void; paid: () => void }) {
  return (
    <>
      <Header back title="Suscripción Premium" onBack={back} />
      <main className="payment-page">
        <div className="notice reveal"><img src={`${A}/15705.svg`} alt="" /><b>Pago simulado: no se cobrará nada</b></div>
        <div className="reveal delay-1"><h1>Datos de pago</h1><p>Este formulario es solo una demostración.</p></div>
        <div className="form reveal delay-2">
          <label>Nombre en la tarjeta<input placeholder="Como aparece en tu tarjeta" /></label>
          <label>Número de tarjeta<span className="input-icon"><input placeholder="0000 0000 0000 0000" /><img src={`${A}/c3dc5.svg`} alt="" /></span></label>
          <div className="form-row"><label>Vencimiento<input placeholder="MM / AA" /></label><label>CVV<span className="input-icon"><input placeholder="123" /><img src={`${A}/e388e.svg`} alt="" /></span></label></div>
        </div>
        <div className="summary reveal delay-3"><small>RESUMEN</small><b>SafeClick Premium: $29 MXN / mes</b></div>
        <button className="primary reveal delay-4" onClick={paid}>Pagar $29 MXN</button>
      </main>
    </>
  );
}

function Success({ finish }: { finish: () => void }) {
  return (
    <>
      <Header />
      <main className="success-page">
        <div className="success-art reveal">
          <span className="success-halo" />
          <span className="success-circle">✓</span>
          <i className="confetti c1" /><i className="confetti c2" />
        </div>
        <div className="success-copy reveal delay-2"><h1>¡Ya eres Premium!</h1><p>Ahora puedes analizar sin límites.</p></div>
        <span className="premium-active reveal delay-3"><img src={`${A}/e5ae1.svg`} alt="" />Premium activo</span>
        <button className="primary reveal delay-4" onClick={finish}>Empezar a analizar</button>
      </main>
    </>
  );
}

function Result({ url, verdict, back }: { url: string; verdict: Verdict; back: () => void }) {
  const content = verdictCopy[verdict];
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(`${content.label}: ${content.summary}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <>
      <Header back title="Resultado del análisis" onBack={back} />
      <main className="result-page">
        <section className={`verdict-card ${verdict} reveal`}>
          <div><img src={`${A}/${content.icon}`} alt="" /><h1>{content.label}</h1></div>
          <p>{content.summary}</p>
        </section>
        <div className="analyzed reveal delay-1"><small>LINK ANALIZADO</small><p>{url.startsWith("http") ? url : `http://${url}`}</p></div>
        {verdict === "safe" && <div className="notice reveal delay-2"><img src={`${A}/15705.svg`} alt="" />Ningún análisis es perfecto. Ten cuidado igual.</div>}
        <section className="why reveal delay-2">
          <h2>¿Por qué?</h2>
          {content.reasons.map((reason, index) => <div className="reason" key={reason}><span><img src={`${A}/${content.reasonIcons[index]}`} alt="" /></span><p>{reason}</p></div>)}
        </section>
        <div className="result-actions reveal delay-3">
          <button className="primary" onClick={back}>Analizar otro link</button>
          <button className="secondary" onClick={copy}><img src={`${A}/6fdc5.svg`} alt="" />{copied ? "Explicación copiada" : "Copiar explicación"}</button>
        </div>
      </main>
    </>
  );
}

function Login({ back, signedIn, accountEmail, onSignedIn, onSignOut }: { back: () => void; signedIn: boolean; accountEmail: string; onSignedIn: (email: string) => void; onSignOut: () => void }) {
  const [email, setEmail] = useState(accountEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Escribe tu correo y contraseña para continuar.");
      return;
    }
    if (!email.includes("@")) {
      setError("Escribe un correo electrónico válido.");
      return;
    }
    setError("");
    onSignedIn(email.trim());
  };

  if (signedIn) {
    return (
      <>
        <Header back title="Mi cuenta" onBack={back} />
        <main className="login-page account-page">
          <div className="login-mark reveal"><img src={`${A}/bd7e2.svg`} alt="" /></div>
          <section className="login-copy reveal delay-1">
            <h1>Tu sesión está activa</h1>
            <p>Tu historial y preferencias están protegidos en este dispositivo.</p>
          </section>
          <div className="account-card reveal delay-2">
            <small>CUENTA</small>
            <strong>{accountEmail || "usuario@safeclick.mx"}</strong>
            <span>Protección activa</span>
          </div>
          <div className="login-actions reveal delay-3">
            <button className="primary" onClick={back}>Volver a SafeClick</button>
            <button className="secondary" onClick={() => { setEmail(""); setPassword(""); onSignOut(); }}>Cerrar sesión</button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header back title="Iniciar sesión" onBack={back} />
      <main className="login-page">
        <div className="login-mark reveal"><img src={`${A}/f6860.svg`} alt="" /></div>
        <section className="login-copy reveal delay-1">
          <h1>Qué bueno verte</h1>
          <p>Ingresa para guardar tus análisis y acceder a ellos desde cualquier lugar.</p>
        </section>
        <form className="login-form reveal delay-2" onSubmit={submit} noValidate>
          <label>
            Correo electrónico
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" />
          </label>
          <label>
            Contraseña
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Escribe tu contraseña" />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary" type="submit">Iniciar sesión</button>
        </form>
        <div className="login-help reveal delay-3">
          <button type="button">¿Olvidaste tu contraseña?</button>
          <p>Este acceso es una demostración. No enviaremos tus datos.</p>
        </div>
      </main>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("analyze");
  const [returnPage, setReturnPage] = useState<Page>("analyze");
  const [signedIn, setSignedIn] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [result, setResult] = useState({ url: "https://www.google.com", verdict: "safe" as Verdict });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  const showResult = (url: string, verdict: Verdict) => {
    setResult({ url, verdict });
    setPage("result");
  };
  const openLogin = () => {
    setReturnPage(page);
    setPage("login");
  };
  return (
    <div className="app-shell">
      <div className="screen" key={page}>
        {page === "analyze" && <Analyze onResult={showResult} onLogin={openLogin} signedIn={signedIn} />}
        {page === "history" && <History open={showResult} onLogin={openLogin} signedIn={signedIn} />}
        {page === "premium" && <Premium subscribe={() => setPage("payment")} onLogin={openLogin} signedIn={signedIn} />}
        {page === "payment" && <Payment back={() => setPage("premium")} paid={() => setPage("success")} />}
        {page === "success" && <Success finish={() => setPage("analyze")} />}
        {page === "result" && <Result {...result} back={() => setPage("analyze")} />}
        {page === "login" && <Login back={() => setPage(returnPage)} signedIn={signedIn} accountEmail={accountEmail} onSignedIn={(email) => { setAccountEmail(email); setSignedIn(true); }} onSignOut={() => { setSignedIn(false); setAccountEmail(""); }} />}
      </div>
      {(["analyze", "history", "premium"] as Page[]).includes(page) && <BottomNav page={page} go={setPage} />}
      <div className="gesture" />
    </div>
  );
}
