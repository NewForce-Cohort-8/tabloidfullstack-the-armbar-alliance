using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using TabloidFullStack.Utils;
using Microsoft.Data.SqlClient;

namespace TabloidFullStack.Repositories
{


    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, 
                               p.ImageLocation AS HeaderImage,
                               p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                               p.CategoryId, p.UserProfileId,
                               c.[Name] AS CategoryName,
                               u.FirstName, u.LastName, u.DisplayName, 
                               u.Email, u.CreateDateTime AS UserCreateDateTime, 
                               u.ImageLocation AS AvatarImage,
                               u.UserTypeId, 
                               ut.[Name] AS UserTypeName
                          FROM Post p
                               LEFT JOIN Category c ON p.CategoryId = c.Id
                               LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                               LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE p.IsApproved = 1
                         ORDER BY p.PublishDateTime DESC";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                ImageLocation = reader.IsDBNull(reader.GetOrdinal("HeaderImage")) ? null : reader.GetString(reader.GetOrdinal("HeaderImage")),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                CategoryName = reader.GetString(reader.GetOrdinal("CategoryName")),
                                User = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserCreateDateTime")),
                                    ImageLocation = reader.IsDBNull(reader.GetOrdinal("AvatarImage")) ? null : reader.GetString(reader.GetOrdinal("AvatarImage")),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    UserType = new UserType
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                    }
                                }
                            });
                        }
                        return posts;
                    }
                }
            }
        }
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, up.Id AS AuthorId, up.DisplayName, up.FirstName, up.LastName, up.ImageLocation AS AuthorImage, up.UserTypeId, up.email, ut.[Name] AS UserTypeName
                        FROM Post p
                               LEFT JOIN UserProfile up on up.Id = p.UserProfileId
               
                               LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                        WHERE p.Id = @Id
                        ";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    Post post = null;
                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }
                    reader.Close();
                    return post;
                }
            }
        }
        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                IsApproved = DbUtils.GetBoolean(reader, "IsApproved"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDatetime"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                //Category = new Category()
                //{
                //    Id = DbUtils.GetInt(reader, "CategoryId"),
                //    Name = DbUtils.GetString(reader, "CategoryName"),
                //},
                User = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "AuthorId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    ImageLocation = DbUtils.GetString(reader, "AuthorImage"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Name = DbUtils.GetString(reader, "UserTypeName")
                    }
                }
            };
        }
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
public void Delete(int id)
{
    using (var conn = Connection)
    {
        conn.Open();
        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
            DbUtils.AddParameter(cmd, "@id", id);
            cmd.ExecuteNonQuery();
        }
    }
}
    }
}

//        public List<Post> GetAllWithComments()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated,
//                       p.ImageUrl AS PostImageUrl, p.UserProfileId AS PostUserProfileId,

//                       up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated,
//                       up.ImageUrl AS UserProfileImageUrl,

//                       c.Id AS CommentId, c.Message, c.UserProfileId AS CommentUserProfileId
//                  FROM Post p
//                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                       LEFT JOIN Comment c on c.PostId = p.id
//              ORDER BY p.DateCreated";

//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        var postId = DbUtils.GetInt(reader, "PostId");

//                        var existingPost = posts.FirstOrDefault(p => p.Id == postId);
//                        if (existingPost == null)
//                        {
//                            existingPost = new Post()
//                            {
//                                Id = postId,
//                                Title = DbUtils.GetString(reader, "Title"),
//                                Caption = DbUtils.GetString(reader, "Caption"),
//                                DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                                UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
//                                UserProfile = new UserProfile()
//                                {
//                                    Id = DbUtils.GetInt(reader, "PostUserProfileId"),
//                                    Name = DbUtils.GetString(reader, "Name"),
//                                    Email = DbUtils.GetString(reader, "Email"),
//                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                    ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                                },
//                                Comments = new List<Comment>()
//                            };

//                            posts.Add(existingPost);
//                        }

//                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
//                        {
//                            existingPost.Comments.Add(new Comment()
//                            {
//                                Id = DbUtils.GetInt(reader, "CommentId"),
//                                Message = DbUtils.GetString(reader, "Message"),
//                                PostId = postId,
//                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId")
//                            });
//                        }
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }
//        public List<Post> Search(string criterion, bool sortDescending)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    var sql =
//                        @"SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated, 
//                        p.ImageUrl AS PostImageUrl, p.UserProfileId,

//                        up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated, 
//                        up.ImageUrl AS UserProfileImageUrl
//                    FROM Post p 
//                        LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                    WHERE p.Title LIKE @Criterion OR p.Caption LIKE @Criterion";

//                    if (sortDescending)
//                    {
//                        sql += "ORDER BY p.DateCreated DESC";
//                    }
//                    else
//                    {
//                        sql += "ORDER BY p.DateCreated";
//                    }

//                    cmd.CommandText = sql;
//                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        posts.Add(new Post()
//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Caption = DbUtils.GetString(reader, "Caption"),
//                            DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                Name = DbUtils.GetString(reader, "Name"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                            },
//                        });
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }

//        public List<Post> SearchHottest(DateTime since)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated, 
//                        p.ImageUrl AS PostImageUrl, p.UserProfileId,

//                        up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated, 
//                        up.ImageUrl AS UserProfileImageUrl
//                    FROM Post p 
//                        LEFT JOIN UserProfile up ON p.UserProfileId = up.id
//                    WHERE p.DateCreated >= @Since";

//                    DbUtils.AddParameter(cmd, "@Since", $"{since}");
//                    var reader = cmd.ExecuteReader();

//                    var posts = new List<Post>();
//                    while (reader.Read())
//                    {
//                        posts.Add(new Post()
//                        {
//                            Id = DbUtils.GetInt(reader, "PostId"),
//                            Title = DbUtils.GetString(reader, "Title"),
//                            Caption = DbUtils.GetString(reader, "Caption"),
//                            DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
//                            ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
//                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
//                            UserProfile = new UserProfile()
//                            {
//                                Id = DbUtils.GetInt(reader, "UserProfileId"),
//                                Name = DbUtils.GetString(reader, "Name"),
//                                Email = DbUtils.GetString(reader, "Email"),
//                                DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
//                                ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
//                            },
//                        });
//                    }

//                    reader.Close();

//                    return posts;
//                }
//            }
//        }


//        public void Update(Post post)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        UPDATE Post
//                           SET Title = @Title,
//                               Caption = @Caption,
//                               DateCreated = @DateCreated,
//                               ImageUrl = @ImageUrl,
//                               UserProfileId = @UserProfileId
//                         WHERE Id = @Id";

//                    DbUtils.AddParameter(cmd, "@Title", post.Title);
//                    DbUtils.AddParameter(cmd, "@Caption", post.Caption);
//                    DbUtils.AddParameter(cmd, "@DateCreated", post.DateCreated);
//                    DbUtils.AddParameter(cmd, "@ImageUrl", post.ImageUrl);
//                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);
//                    DbUtils.AddParameter(cmd, "@Id", post.Id);

//                    cmd.ExecuteNonQuery();
//                }
//            }
//        }

//    }
//}