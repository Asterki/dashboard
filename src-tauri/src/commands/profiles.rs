use sea_orm::{DatabaseConnection, EntityTrait};
use serde::Serialize; // your SeaORM entity

use crate::{
    entity::profiles,
    services::profiles::{CreateProfileInput, ProfileService},
};

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

// Outgoing command payload
#[derive(Debug, Serialize)]
pub struct ListProfilesCommandOutput {
    pub status: String,
    pub profiles: Vec<crate::entity::profiles::Model>,
}

// Example: list all users
#[tauri::command]
#[allow(dead_code)] // Used elsewhere
pub async fn profiles_list_command(
    db: tauri::State<'_, DatabaseConnection>,
) -> Result<ListProfilesCommandOutput, String> {
    let users = profiles::Entity::find()
        .all(&*db)
        .await
        .map_err(|e| e.to_string())?;

    Ok(ListProfilesCommandOutput {
        status: "success".to_string(),
        profiles: users,
    })
}
