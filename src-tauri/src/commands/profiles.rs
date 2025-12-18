use crate::entity;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("hello, {}! you've been greeted from rust!", name)
}
