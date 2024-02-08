using Microsoft.Extensions.Hosting;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{

    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        [DisplayName("Post")]
        public int PostId { get; set; }

        //public Post? Post { get; set; }

        [DisplayName("Author")]
        public int UserProfileId { get; set; }
        public UserProfile? UserProfile { get; set; }

    }
}