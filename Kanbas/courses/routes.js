// import Database from "../Database/index.js";
import {
    findAllCourses,
    findCourseById,
    createNewCourse,
    deleteCourse,
    updateCourse,
  } from "./dao.js";
export default function CourseRoutes(app){
    
    app.get("/api/courses/:id", async(req,res)=>{
        const {id}=req.params;
        const course=await findCourseById(id);
        if(!course){
            res.status(404).send("Course Not Found");
            return;
        }
        res.send(course);
    });

    app.get("/api/courses",async(req,res)=>{
        const courses=await findAllCourses();
        res.send(courses);
    });
    
    app.post("/api/courses", async(req,res)=>{
        const course = { ...req.body, _id: new Date().getTime().toString() };
        // Database.courses.push(course);
        const newCourse = await createNewCourse(course);
        res.send(newCourse);
    });

    app.delete("/api/courses/:id", async (req,res)=>{
        const {id}=req.params;
        // Database.courses=Database.courses.filter((c)=>c._id!==id);
        await deleteCourse(id);
        res.sendStatus(204);
    });

    app.put("/api/courses/:id",async (req,res)=>{
        const {id}= req.params;
        const course=req.body;
        // Database.courses=Database.courses.map((c)=>
        // c._id===id? {...c,...course}:c);
        await updateCourse(id, course);
        res.sendStatus(204);
    });
}