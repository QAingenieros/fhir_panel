﻿using System;
using System.Collections.Generic;
using System.Text;
using AspStudio.Models;
using Microsoft.EntityFrameworkCore;

namespace AspStudio.Data
{
    public class ApplicationDbContext : DbContext
    {
        

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Device> Devices {get; set;}
        public DbSet<Person> Persons {get; set;}
        public DbSet<Employee> Empleados { get; set; }
        public DbSet<DeviceSite> DeviceSites { get; set; }
        public DbSet<DeviceEmployee> DeviceEmployees { get; set; }
        public DbSet<FhirData> FhirDatas { get; set; }

        public DbSet<Reconocimiento> Reconocimientos { get; set;}
        public DbSet<RecoDia> RecoDia { get; set;}
        public DbSet<SopoRecoDia> SopoRecoDias { get; set;}
        public DbSet<RepoEnrolamiento> RepoEnrolamientos { get; set;}
        public DbSet<RepoEnrollDevice> RepoEnrollDevices { get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Reconocimiento>().HasNoKey();
            builder.Entity<RecoDia>().HasNoKey();
            builder.Entity<SopoRecoDia>().HasNoKey();
            builder.Entity<RepoEnrolamiento>().HasNoKey();
            builder.Entity<RepoEnrollDevice>().HasNoKey();
            //builder.Entity<Person>().
            //    HasOne(p => p.Employee);
        }


    }
}
