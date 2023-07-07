import facet_utils

parser = facet_utils.set_arg_parser()

args = parser.parse_args()

facet_utils.set_facet(args, facet_utils.FacetAction.Delete)
