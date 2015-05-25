from fabric.api import local, sudo, run, env, settings, cd, lcd, put, shell_env
from datetime import date

env.hosts = ['test']
env.db_list = ['advertisement', 'catalog', "django_default"]
env.user = 'test'
core_dir = '/Users/test/Dev/example'
cur_date = str(date.today()).replace('-','_')

def dump_db():
        for db in env.db_list:
            with settings(warn_only=True):
                local("pg_dump -Fc \"{0}\" > {0}.dump".format(db))


def archive_project():
    with lcd(core_dir):
        local('tar -czf etachka_exchange_{}.zip project_dir/'.format(cur_date))


def put_file_to_server():
    with lcd(core_dir):
        put('project_{}.zip'.format(cur_date))
        run('tar  -xzf project_{}.zip'.format(cur_date))


def clear_remote_server():
    sudo('rm -rfd project_dir')


def restore_db():
    with settings(warn_only=True):
        with shell_env(PGPASSWORD='BangBig8'):
            for db in env.db_list:
                    run("psql postgres -c \"drop database {}\"".format(db))
            for db in env.db_list:
                run("psql postgres -c \"create database \"{}\" owner {}\"".format(db, env.user))
                with cd('project_dir'):
                    run("pg_restore -C -d {0} {0}.dump".format(db))
    sudo('service uwsgi restart')
    sudo('service nginx restart')


def deploy():
    dump_db()
    archive_project()
    clear_remote_server()
    put_file_to_server()
    restore_db()

