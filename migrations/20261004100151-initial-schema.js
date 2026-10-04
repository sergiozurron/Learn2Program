'use strict';

/**
 * Initial database schema for Learn2Program.
 *
 * Based on the current Sequelize models in the repository.
 *
 * Notes:
 * - The models don't explicitly declare every association-generated FK column.
 *   Those columns are declared here explicitly so the physical schema is
 *   versioned and reproducible.
 * - FK columns that are generated implicitly by the current associations are
 *   nullable to remain compatible with the current application/seed data.
 * - LogroUsuario is not associated in the model files, but it clearly acts as
 *   a join table through idUsuario + idLogro, so both foreign keys are declared.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    /*
     * cursos
     */
    await queryInterface.createTable('cursos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      titulo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      enRevision: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });

    /*
     * usuario
     */
    await queryInterface.createTable('usuario', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      contraseña: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    /*
     * temas
     */
    await queryInterface.createTable('temas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      contenido: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      idCurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cursos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * test
     *
     * Curso.hasOne(Test) creates idCurso on Test.
     * The current association does not specify CASCADE for deletion,
     * so SET NULL matches Sequelize's nullable FK behavior here.
     */
    await queryInterface.createTable('test', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      titulo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      idCurso: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cursos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    /*
     * logro
     */
    await queryInterface.createTable('logro', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      mensajeMotivacionalCursoOK: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      mensajeMotivacionalCursoKO: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      imagen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      idCurso: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cursos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * preguntas
     */
    await queryInterface.createTable('preguntas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      enunciado: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      retroalimentacion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      idTest: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'test',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * respuestas
     */
    await queryInterface.createTable('respuestas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      texto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      esCorrecta: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      idPregunta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'preguntas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * intentos_test
     */
    await queryInterface.createTable('intentos_test', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      preguntasAcertadas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      preguntasIntentadas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      nota: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },

      terminado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      fechaFin: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      /*
       * Generated by Test.hasMany(IntentoTest)
       */
      idTest: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'test',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      /*
       * Generated by Usuario.hasMany(IntentoTest)
       */
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * recordatorios
     */
    await queryInterface.createTable('recordatorios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      mensaje: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },

      asunto: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      /*
       * Generated by Usuario.hasMany(Recordatorio)
       */
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * intentos_pregunta
     *
     * These three FKs are generated by associations:
     *   Pregunta.hasMany(IntentoPregunta)
     *   Respuesta.hasMany(IntentoPregunta)
     *   IntentoTest.hasMany(IntentoPregunta)
     */
    await queryInterface.createTable('intentos_pregunta', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      idPregunta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'preguntas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      /*
       * Nullable because the application creates an attempt before
       * the user selects an answer.
       */
      idRespuesta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'respuestas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      idIntentoTest: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'intentos_test',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    /*
     * LogroUsuario
     *
     * Composite primary key:
     *   (idUsuario, idLogro)
     *
     * There are no Sequelize associations for this model at present,
     * but these columns are clearly references to Usuario and Logro.
     */
    await queryInterface.createTable('LogroUsuario', {
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'usuario',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      idLogro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'logro',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    /*
     * Remove child tables before parent tables because of FK constraints.
     */
    await queryInterface.dropTable('LogroUsuario');
    await queryInterface.dropTable('intentos_pregunta');
    await queryInterface.dropTable('recordatorios');
    await queryInterface.dropTable('intentos_test');
    await queryInterface.dropTable('respuestas');
    await queryInterface.dropTable('preguntas');
    await queryInterface.dropTable('logro');
    await queryInterface.dropTable('test');
    await queryInterface.dropTable('temas');
    await queryInterface.dropTable('usuario');
    await queryInterface.dropTable('cursos');
  },
};
