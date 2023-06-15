from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Solution, db


solution = Blueprint('solution', __name__)


@solution.route('/')
# @login_required
def get_solution():
    solution_query = Solution.query.get(1);

    return solution_query.to_dict()
