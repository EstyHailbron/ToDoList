using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Interfaces;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyTaskController : ControllerBase
    {
        
        ITaskService TaskService;
        ITokenService TokenService;
        // private string userName;
        // private int userId;
        public MyTaskController(ITaskService TaskService)
         {
            // IHttpContextAccessor httpContextAccessor
        //     var user = httpContextAccessor.HttpContext.User;
        //     userName = user.FindFirst("name")?.Value;
        //     userId = int.Parse(user.FindFirst("UserId")?.Value);
            this.TaskService = TaskService;
        }


        [HttpGet]
        // [HttpGet("{token}")]
        public ActionResult<List<MyTask>> GetAll(String token) {
        // this.userId=TokenService.Decode(token);
        return TaskService.GetAll(token);
        }
        [HttpGet("{id}")]
        public ActionResult<MyTask> Get(int id)
        {
            var task = TaskService.Get(id);
            if (task == null)
                return NotFound();
            return task;
        }

        [HttpPost]
        public IActionResult Add(String token, MyTask task)
        {
            TaskService.Add(token, task);
            return CreatedAtAction(nameof(Add), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, MyTask task)
        {
            if (id != task.Id)
                return BadRequest();
            var existingTask = TaskService.Get(id);
            if (existingTask is null)
                return NotFound();
            TaskService.Update(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = TaskService.Get(id);
            if (task is null)
                return NotFound();
            TaskService.Delete(id);
            return Content(TaskService.Count.ToString());
        }
    }
}