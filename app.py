from flask import Flask, request
from app.database import get_connection, init_db
from app.responses import success, error
from app.validators import validate_item

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return "Servidor rodando! Use /itens para POST"

    # Aqui você pode salvar no banco usando get_connection()
    return success(data, "Item criado com sucesso!")

if __name__ == "__main__":
    app.run(debug=True)
