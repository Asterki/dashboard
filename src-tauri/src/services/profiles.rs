use crate::entity;
use sea_orm::{ActiveModelTrait, DatabaseConnection, Set};
use serde::Deserialize;

#[allow(dead_code)]
pub struct ProfileService;

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct CreateProfileInput {
    pub name: String,
    pub description: String,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct CreateProfileOutput {
    pub status: String,
    pub profile: entity::profiles::Model,
}

#[allow(dead_code)]
impl ProfileService {
    pub async fn create_profile(
        db: &DatabaseConnection,
        input: CreateProfileInput,
    ) -> Result<CreateProfileOutput, sea_orm::DbErr> {
        let profile = entity::profiles::ActiveModel {
            name: Set(input.name),
            description: Set(input.description),
            created_at: Set(chrono::Utc::now().to_utc()),
            updated_at: Set(chrono::Utc::now().to_utc()),
            ..Default::default()
        };
        let inserted = profile.insert(db).await?;
        Ok(CreateProfileOutput {
            status: "success".to_string(),
            profile: inserted,
        })
    }
}
