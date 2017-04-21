
import "core-js/es6/promise";
import * as RX from "reactxp";
import { App } from "components/app";

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
