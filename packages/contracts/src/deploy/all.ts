//import * as Assets from "./assets/index.js";
import * as Common from "./common/index.js";
import * as Plugins from "./plugins/index.js";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AllDeploy = async () => { };
AllDeploy.tags = ["All"];
AllDeploy.dependencies = [
    ...Common.ImplementationsDeploy.tags,
    ...Common.UpgradeableBeaconDeploy.tags,
    ...Plugins.ERC2981SetterDeploy.tags,
    ...Plugins.TokenDnaDeploy.tags,
    ...Plugins.TokenURIDeploy.tags,
    ...Plugins.TokenURIBaseURIDeploy.tags,
    ...Plugins.TokenURIDnaDeploy.tags,
    /*
    ...Assets.ERC20MintableDeploy.tags,
    ...Assets.ERC721MintableDeploy.tags,
    ...Assets.ERC721MintableAutoIdDeploy.tags,
    ...Assets.ERC1155MintableDeploy.tags,
    ...Plugins.AssetRouterInputDeploy.tags,
    ...Plugins.AssetRouterOutputDeploy.tags,
    ...Plugins.AssetRouterCraftDeploy.tags,
    */
];
