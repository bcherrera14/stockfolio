using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NHibernate;
using API.Models;

namespace API.Controllers
{


    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private ISessionFactory _sessionFactory;
        public AuthenticationController(ISessionFactory factory)
        {
            _sessionFactory = factory;
        }

        //Login Auth
        [HttpGet("api/login")]
        public ActionResult<User> GetAuth(string username, string password)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var user = session.Query<User>()
                        .Where(u => u.username == username).FirstOrDefault();

                if (user != null && user.password == password)
                {
                    return user;
                }
                else
                {
                    return NotFound("User Not Found.");
                }
            }
        }
    }
}