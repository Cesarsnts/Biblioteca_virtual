from flask import Flask, request
from app.database import items_db
from app.responses import success, error
from app.validators import validate_item
from app.config import STATUS_PERMITIDOS

app = Flask(__name__)

@app.route("/items", methods=["GET"])
def get_items():
    return success(items_db)

@app.route("/items", methods=["POST"])
def create_item():
    data = request.json
    validation_error = validate_item(data)

    if validation_error:
        return error(validation_error)

    item = {
        "id": len(items_db) + 1,
        "titulo": data["titulo"],
        "tipo": data["tipo"],
        "status": data["status"],
        "valor": data.get("valor")
    }

    items_db.append(item)
    return success(item, "Item criado", 201)

@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    data = request.json
    validation_error = validate_item(data)

    if validation_error:
        return error(validation_error)

    for item in items_db:
        if item["id"] == item_id:
            item.update(data)
            return success(item, "Item atualizado")

    return error("Item não encontrado", 404)

@app.route("/items/<int:item_id>/status", methods=["PATCH"])
def update_status(item_id):
    data = request.json

    if "status" not in data or data["status"] not in STATUS_PERMITIDOS:
        return error("Status inválido")

    for item in items_db:
        if item["id"] == item_id:
            item["status"] = data["status"]
            return success(item, "Status atualizado")

    return error("Item não encontrado", 404)

@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    for item in items_db:
        if item["id"] == item_id:
            items_db.remove(item)
            return success(message="Item removido")

    return error("Item não encontrado", 404)

if __name__ == "__main__":
    app.run(debug=True)
