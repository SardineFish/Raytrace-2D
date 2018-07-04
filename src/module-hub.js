/**
 * To solve the problem cause by Webpack.
 */

import { BuildSDF } from "./sdf-builder";
window.moduleHub = {
    BuildSDF: BuildSDF
};

export { moduleHub };