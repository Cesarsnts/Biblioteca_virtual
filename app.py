from flask import Flask, request
from app.database import get_connection, init_db
from app.responses import success, error
from app.validators import validate_item
from app.config import STATUS_PERMITIDOS

app = Flask(__name__)

init_db()

@app.route("/items", methods=["GET"])
def get_items():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM items")
    rows = cursor.fetchall()

    items = [
        {
            "id": r[0],
            "titulo": r[1],
            "tipo": r[2],
            "status": r[3],
            "valor": r[4]
        } for r in rows
    ]

    conn.close()
    return success(items)


@app.route("/items", methods=["POST"])
def create_item():
    data = request.json
    validation_error = validate_item(data)

    if validation_error:
        return error(validation_error)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO items (titulo, tipo, status, valor)
        VALUES (?, ?, ?, ?)
    """, (
        data["titulo"],
        data["tipo"],
        data["status"],
        data.get("valor")
    ))

    conn.commit()
    item_id = cursor.lastrowid
    conn.close()

    return success(
        {
            "id": item_id,
            **data
        },
        "Item criado",
        201
    )


@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    data = request.json
    validation_error = validate_item(data)

    if validation_error:
        return error(validation_error)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE items
        SET titulo=?, tipo=?, status=?, valor=?
        WHERE id=?
    """, (
        data["titulo"],
        data["tipo"],
        data["status"],
        data.get("valor"),
        item_id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return error("Item não encontrado", 404)

    conn.close()
    return success(data, "Item atualizado")


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
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM items WHERE id=?", (item_id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return error("Item não encontrado", 404)

    conn.close()
    return success(message="Item removido")


if __name__ == "__main__":
    app.run(debug=True)

