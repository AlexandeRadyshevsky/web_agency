/* ============================================================
   App — composes the full landing page
   ============================================================ */
function App() {
  return React.createElement(LangProvider, null,
    React.createElement(BgGalaxy, null),
    React.createElement(Nav, null),
    React.createElement(PartnerStrip, null),
    React.createElement("main", null,
      React.createElement(Hero, null),
      React.createElement(Strip, null),
      React.createElement(Services, null),
      React.createElement(Problem, null),
      React.createElement(Process, null),
      React.createElement(About, null),
      React.createElement(Why, null),
      React.createElement(FormSection, null)),
    React.createElement(Footer, null),
    React.createElement(WhatsApp, null),
    React.createElement(CookieBanner, null));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
