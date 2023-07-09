import "reflect-metadata";
import {Container} from "inversify";
import {ApiService} from "../repositories/ApiService";
import {StoreConfig} from "./StoreConfig";

const container = new Container();

container.bind(StoreConfig).toSelf().inSingletonScope()
container.bind(ApiService).toSelf().inSingletonScope()

export {container}
