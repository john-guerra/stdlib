import {vega, vegalite, vegaliteApi} from "./dependencies.js";

export default async function vl(require) {
  const [v, vl, api] = await Promise.all([vega, vegalite, vegaliteApi].map(d => require(d.resolve())));

  const options = {
    config: {
      // vega-lite default configuration
      config: {
        view: {continuousWidth: 400, continuousHeight: 300},
        mark: {tooltip: null}
      }
    },
    init: view => {
      // initialize tooltip handler
      view.tooltip(new tooltip.Handler().call);
      // enable horizontal scrolling for large plots
      if (view.container()) view.container().style["overflow-x"] = "auto";
    },
    view: {
      // view constructor options
      loader: vega.loader({baseURL: "https://cdn.jsdelivr.net/npm/vega-datasets@2/"}),
      renderer: "canvas"
    }
  };

  return api.register(v, vl);
}
