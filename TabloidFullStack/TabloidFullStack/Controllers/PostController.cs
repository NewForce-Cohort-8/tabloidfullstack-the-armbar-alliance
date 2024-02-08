
using System;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        //    [HttpGet("{id}")]
        //    public IActionResult Get(int id)
        //    {
        //        var post = _postRepository.GetById(id);
        //        if (post == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(post);
        //    }

        //    [HttpPost]
        //    public IActionResult Post(Post post)
        //    {
        //        _postRepository.Create(post.Title, post.Content, post.CategoryId, post.ImageLocation, post.UserProfileId);
        //        return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
        //    }

        //    [HttpPut("{id}")]
        //    public IActionResult Put(int id, Post post)
        //    {
        //        if (id != post.Id)
        //        {
        //            return BadRequest();
        //        }

        //        _postRepository.Update(post);
        //        return NoContent();
        //    }

        //    [HttpDelete("{id}")]
        //    public IActionResult Delete(int id)
        //    {
        //        _postRepository.Delete(id);
        //        return NoContent();
        //    }
        //}
    }
}
