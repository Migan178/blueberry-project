create table user (
    id integer not null,
    user_id varchar(255) not null,
    coin integer not null default 0,
    created_at datetime not null default current_timestamp(),
    primary key (`id`)
);