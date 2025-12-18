use sea_orm::DatabaseConnection;
use serde::Serialize; // your SeaORM entity

use crate::services::profiles::{CreateProfileInput, ProfileService};

// Outgoing command payload
#[derive(Debug, Serialize)]
pub struct CreateProfileCommandOutput {
    pub status: String,
    pub profile: crate::entity::profiles::Model,
}

// Tauri command wrapping the service function
#[tauri::command]
#[allow(dead_code)] // Used elsewhere
pub async fn profiles_create_command(
    db: tauri::State<'_, DatabaseConnection>,
    input: CreateProfileInput,
) -> Result<CreateProfileCommandOutput, String> {
    // TODO: Add validation or additional logic here if needed

    ProfileService::create_profile(&db, input)
        .await
        .map_err(|e| e.to_string())
        .map(|output| CreateProfileCommandOutput {
            status: output.status,
            profile: output.profile,
        })
}

// // Example: list all users
// #[tauri::command]
// pub async fn list_users_command(
//     db: tauri::State<'_, DatabaseConnection>,
// ) -> Result<Vec<CreateProfileOuput>, String> {
//     let users = profiles::Entity::find()
//         .all(&*db)
//         .await
//         .map_err(|e| e.to_string())?;
//     Ok(users
//         .into_iter()
//         .map(|u| CreateProfileOuput {
//             id: u.id,
//             name: u.name,
//         })
//         .collect())
// }
