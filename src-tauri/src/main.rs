// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenvy::dotenv;
use sea_orm::{ConnectOptions, Database, TransactionTrait};
use std::{env, time::Duration};

mod commands;
mod config;
mod entity;

use sea_orm::{ActiveModelTrait, Set};

async fn create_user(db: &sea_orm::DatabaseConnection) {
    let user = entity::profiles::ActiveModel {
        name: Set("Fer".to_string()),
        description: Set("fer@test.com".to_string()),
        created_at: Set(chrono::Utc::now()),
        updated_at: Set(chrono::Utc::now()),
        ..Default::default()
    };

    user.insert(db).await.unwrap();
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let mut opt = ConnectOptions::new(env::var("DATABASE_URL").unwrap());
    opt.max_connections(100)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(8))
        .acquire_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(false) // disable SQLx logging
        .sqlx_logging_level(log::LevelFilter::Info)
        .set_schema_search_path("my_schema"); // set default Postgres schema

    let db = Database::connect(opt).await.unwrap();

    db.begin().await.unwrap();

    create_user(&db).await;

    dashboard_tauri_lib::run();
}
