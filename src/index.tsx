/**
 * This is the entry file of the Direflow setup.
 *
 * You can add any additional functionality here.
 * For example, this is a good place to hook into your
 * Web Component once it's mounted on the DOM.
 *
 * !This file cannot be removed.
 * It can be left blank if not needed.
 */

import GfiTsWaterParams from "./direflow-components/gfi-ts-water-params";

GfiTsWaterParams.then((element) => {
	console.log("gfi-ts-water-params is mounted on the DOM", element);
});
