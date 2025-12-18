// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenvy::dotenv;

mod commands;
mod config;
mod entity;
mod services;

#[tokio::main]
async fn main() {
    dotenv().ok();
    dashboard_tauri_lib::run().await;
}
