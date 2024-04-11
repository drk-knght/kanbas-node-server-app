// import db from "../Database/index.js";
import {
  deleteModule,
  createNewModule,
  updateModule,
  findAllModules,
} from "./dao.js";

function ModuleRoutes(app) {
  app.delete("/api/modules/:mid", async(req, res) => {
    const { mid } = req.params;
    // db.modules = db.modules.filter((m) => m._id !== mid);
    await deleteModule(mid);
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/modules", async(req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    // db.modules.push(newModule);
    const createdModule = await createNewModule(newModule);
    res.send(createdModule);
  });
  app.get("/api/courses/:cid/modules",async(req, res) => {
    const { cid } = req.params;
    const modules = await findAllModules(cid);
    // db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });

  app.put("/api/modules/:mid", async(req, res) => {
    const { mid } = req.params;
    // const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    // db.modules[moduleIndex] = {
    //   ...db.modules[moduleIndex],
    //   ...req.body,
    // };
    await updateModule(mid, req.body);
    res.sendStatus(204);
  });
}
export default ModuleRoutes;
