import { BaseRoute } from "../../base/base.route";
import { RouteConfig } from "../../base/base.type";
import { TodoController } from "./todo.controller";

export class TodoRoute extends BaseRoute<TodoController> {
    constructor(controller: TodoController, routeConfig: RouteConfig) {
        super(controller, routeConfig);
    }

    initializeRoutes(): void {
        this.get({
            path: '/',
        }, this.controller.getAll.bind(this.controller)),
            this.post({
                path: '/'
            }, this.controller.create.bind(this.controller)),
            this.delete({ path: "/:id" }, this.controller.delete.bind(this.controller)),
            this.put({ path: '/:id' }, this.controller.update.bind(this.controller))
    }
}