mod commands;
mod config;
mod entity;
mod services;

use crate::commands::profiles;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let db = crate::config::db::connect_to_database().await;

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(db)
        .invoke_handler(tauri::generate_handler![profiles::profiles_create_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
