use crate::entity;
use sea_orm::{ActiveModelTrait, DatabaseConnection, EntityTrait, Set};
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
            name: Set(Some(input.name)),
            description: Set(Some(input.description)),
            created_at: Set(Some(chrono::Utc::now().timestamp())),
            updated_at: Set(Some(chrono::Utc::now().timestamp())),
            ..Default::default()
        };
        let inserted = profile.insert(db).await?;
        Ok(CreateProfileOutput {
            status: "success".to_string(),
            profile: inserted,
        })
    }

    pub async fn list_profiles(
        db: &DatabaseConnection,
    ) -> Result<Vec<entity::profiles::Model>, sea_orm::DbErr> {
        let profiles: Vec<entity::profiles::Model> =
            entity::profiles::Entity::find().all(db).await?;
        Ok(profiles)
    }
}
