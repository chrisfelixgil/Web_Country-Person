
using Asignacion3.Contexto;
using Asignacion3.Interfaces;
using Asignacion3.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Asignacion3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Configuración servicio CORS para consumo API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirCORS",
                    builder => builder.AllowAnyOrigin()
                                       .AllowAnyHeader()
                                       .AllowAnyMethod());
            });

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSqlServer<Asignacion3Context>(builder.Configuration.GetConnectionString("AppConnection"));

            builder.Services.AddScoped<IPais, PaisService>();
            builder.Services.AddScoped<IUsuario, UsuarioService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //Usar Politica CORS para consumo API
            app.UseCors("PermitirCORS");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
