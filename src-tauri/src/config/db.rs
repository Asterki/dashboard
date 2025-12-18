use sea_orm::{ConnectOptions, Database};
use std::{env, time::Duration};

#[allow(dead_code)] // Used elsewhere
pub async fn connect_to_database() -> sea_orm::DatabaseConnection {
    let mut opt = ConnectOptions::new(env::var("DATABASE_URL").unwrap());
    opt.max_connections(30)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(8))
        .acquire_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(false) // disable SQLx logging
        .sqlx_logging_level(log::LevelFilter::Info)
        .set_schema_search_path("my_schema"); // set default Postgres schema

    let db = Database::connect(opt).await.unwrap();

    return db;
}
